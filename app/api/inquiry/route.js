import nodemailer from "nodemailer";
import { track } from "@vercel/analytics/server";

const inquiryTypeMap = {
  general: "일반 문의",
  image: "이미지 제작 의뢰",
  video: "영상 제작 의뢰",
};
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_FORM_FILL_MS = 1500;
const DISCORD_FIELD_VALUE_MAX_LENGTH = 1000;
const fieldLengthLimits = {
  contact: 120,
  companyName: 120,
  budget: 80,
  deadline: 80,
  pagePath: 240,
  message: 3000,
  companyWebsite: 240,
};
const inquiryRateLimitStore = new Map();

function valueOrFallback(value) {
  return value?.trim() ? value.trim() : "-";
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function truncateValue(value, maxLength) {
  const stringValue = String(value || "").trim();

  if (stringValue.length <= maxLength) {
    return stringValue;
  }

  return `${stringValue.slice(0, Math.max(maxLength - 3, 0))}...`;
}

function normalizeTextField(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return truncateValue(value, maxLength);
}

function normalizeInquiryType(value) {
  return Object.prototype.hasOwnProperty.call(inquiryTypeMap, value) ? value : "general";
}

function normalizeInquiryPayload(payload) {
  return {
    inquiryType: normalizeInquiryType(payload.inquiryType),
    contact: normalizeTextField(payload.contact, fieldLengthLimits.contact),
    companyName: normalizeTextField(payload.companyName, fieldLengthLimits.companyName),
    budget: normalizeTextField(payload.budget, fieldLengthLimits.budget),
    deadline: normalizeTextField(payload.deadline, fieldLengthLimits.deadline),
    pagePath: normalizeTextField(payload.pagePath, fieldLengthLimits.pagePath),
    message: normalizeTextField(payload.message, fieldLengthLimits.message),
    companyWebsite: normalizeTextField(payload.companyWebsite, fieldLengthLimits.companyWebsite),
    formStartedAt: typeof payload.formStartedAt === "number" ? payload.formStartedAt : null,
  };
}

function isEmailAddress(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getRequestIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const requestTimestamps = inquiryRateLimitStore.get(ip) || [];
  const recentTimestamps = requestTimestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recentTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    inquiryRateLimitStore.set(ip, recentTimestamps);
    return true;
  }

  recentTimestamps.push(now);
  inquiryRateLimitStore.set(ip, recentTimestamps);
  return false;
}

function buildInquiryLines(payload) {
  return [
    ["문의 유형", inquiryTypeMap[payload.inquiryType] || payload.inquiryType || "-"],
    ["연락처", valueOrFallback(payload.contact)],
    ["브랜드명 / 회사명", valueOrFallback(payload.companyName)],
    ["희망 예산", valueOrFallback(payload.budget)],
    ["희망 납기", valueOrFallback(payload.deadline)],
    ["유입 페이지", valueOrFallback(payload.pagePath)],
    ["의뢰 내용", valueOrFallback(payload.message)],
  ];
}

async function sendDiscordWebhook(payload) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return false;
  }

  const fields = buildInquiryLines(payload).map(([name, value]) => ({
    name,
    value: truncateValue(value, DISCORD_FIELD_VALUE_MAX_LENGTH) || "-",
  }));

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "JUPSY Inquiry Bot",
      embeds: [
        {
          title: "새 의뢰가 접수되었습니다",
          color: 0x0f172d,
          fields,
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("디스코드 웹훅 전송에 실패했습니다.");
  }

  return true;
}

async function sendEmail(payload) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    auth: {
      user,
      pass,
    },
  });

  const to = process.env.INQUIRY_TO_EMAIL || user;
  const from = process.env.SMTP_FROM_EMAIL || user;
  const text = buildInquiryLines(payload)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n\n");

  await transporter.sendMail({
    to,
    from,
    replyTo: isEmailAddress(payload.contact) ? payload.contact : undefined,
    subject: `[JUPSY] ${inquiryTypeMap[payload.inquiryType] || "새 의뢰"} 접수`,
    text,
  });

  return true;
}

async function sendToInquiryChannel(name, sender) {
  try {
    return {
      name,
      sent: await sender(),
      error: null,
    };
  } catch (error) {
    return {
      name,
      sent: false,
      error,
    };
  }
}

function logInquiryChannelErrors(results) {
  for (const result of results) {
    if (!result.error) {
      continue;
    }

    console.error(`[inquiry] ${result.name} delivery failed`, {
      message: result.error.message,
    });
  }
}

async function trackInquirySubmitted(payload, sentChannels) {
  try {
    await track("Inquiry Submitted", {
      inquiryType: inquiryTypeMap[payload.inquiryType] || payload.inquiryType || "-",
      pagePath: valueOrFallback(payload.pagePath),
      sentChannels: sentChannels.join(","),
    });
  } catch (error) {
    console.error("[inquiry] analytics tracking failed", {
      message: error.message,
    });
  }
}

export async function POST(request) {
  let rawPayload;

  try {
    rawPayload = await request.json();
  } catch {
    return Response.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  try {
    if (!isPlainObject(rawPayload)) {
      return Response.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
    }

    const payload = normalizeInquiryPayload(rawPayload);
    const ip = getRequestIp(request);
    const submittedTooFast = payload.formStartedAt !== null && Date.now() - payload.formStartedAt < MIN_FORM_FILL_MS;

    if (payload.companyWebsite?.trim() || submittedTooFast) {
      return Response.json({ ok: true, ignored: true });
    }

    if (isRateLimited(ip)) {
      return Response.json({ error: "잠시 후 다시 시도해 주세요." }, { status: 429 });
    }

    if (!payload.contact?.trim() || !payload.message?.trim()) {
      return Response.json({ error: "연락처와 의뢰 내용은 필수입니다." }, { status: 400 });
    }

    const channelResults = await Promise.all([
      sendToInquiryChannel("discord", () => sendDiscordWebhook(payload)),
      sendToInquiryChannel("email", () => sendEmail(payload)),
    ]);
    const sentChannels = channelResults.filter((result) => result.sent).map((result) => result.name);
    const failedChannels = channelResults.filter((result) => result.error).map((result) => result.name);

    logInquiryChannelErrors(channelResults);

    if (sentChannels.length === 0) {
      if (failedChannels.length > 0) {
        return Response.json(
          {
            error: "의뢰 접수 채널 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.",
          },
          { status: 500 }
        );
      }

      return Response.json(
        {
          error:
            "서버에 의뢰 수신 채널이 설정되지 않았습니다. DISCORD_WEBHOOK_URL 또는 SMTP 환경변수를 먼저 설정해 주세요.",
        },
        { status: 500 }
      );
    }

    await trackInquirySubmitted(payload, sentChannels);

    return Response.json({ ok: true, sentChannels, failedChannels });
  } catch (error) {
    console.error("[inquiry] request handling failed", {
      message: error.message,
    });

    return Response.json(
      {
        error: error.message || "의뢰 접수 처리 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
