import sendEmail from "../config/email.config.js";

const sendOtpEmail = async (to, otp) => {
  const subject = "Your OTP Code";
  //create the otp page professionally with html and css
  const message = `
    <!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>OTP Verification</title>
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.08);">

<!-- Header -->
<tr>
<td align="center" style="background:#2563eb;padding:35px;">
<h1 style="margin:0;color:#ffffff;font-size:28px;">
🔐 OTP Verification
</h1>
<p style="margin-top:10px;color:#dbeafe;font-size:15px;">
Secure Verification Code
</p>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:40px;">

<h2 style="margin:0;color:#1f2937;">
Hello,
</h2>

<p style="margin-top:20px;font-size:16px;color:#4b5563;line-height:28px;">
We received a request to verify your identity.
Please use the following One-Time Password (OTP) to continue.
</p>

<!-- OTP Box -->
<div style="margin:35px 0;text-align:center;">
<div style="
display:inline-block;
padding:18px 40px;
background:#2563eb;
color:#ffffff;
font-size:34px;
font-weight:bold;
letter-spacing:10px;
border-radius:10px;
font-family:monospace;
">
${otp}
</div>
</div>

<p style="font-size:15px;color:#6b7280;line-height:26px;">
This OTP is valid for
<strong style="color:#111827;">5 minutes</strong>.
For your security, do not share this code with anyone.
</p>

<div style="
margin-top:30px;
padding:18px;
background:#fff7ed;
border-left:5px solid #f59e0b;
border-radius:6px;
">

<p style="margin:0;color:#92400e;font-size:14px;">
<strong>Security Tip:</strong> Our team will never ask for your OTP. If you didn't request this code, simply ignore this email.
</p>

</div>

</td>
</tr>

<!-- Footer -->
<tr>
<td align="center" style="padding:25px;background:#f9fafb;border-top:1px solid #e5e7eb;">

<p style="margin:0;font-size:13px;color:#6b7280;">
This is an automated email. Please do not reply.
</p>

<p style="margin-top:10px;font-size:13px;color:#9ca3af;">
© ${new Date().getFullYear()} Your Company. All Rights Reserved.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
    `;
  await sendEmail(to, subject, message);
};

export default sendOtpEmail;
