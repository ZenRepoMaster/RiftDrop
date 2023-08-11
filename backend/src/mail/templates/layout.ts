export function emailLayout(content: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;background:#070b12;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#e8eef7;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#070b12;padding:32px 0;">
      <tr>
        <td align="center">
          <table width="480" cellpadding="0" cellspacing="0" style="background:#111827;border:1px solid #1f2a3a;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px;border-bottom:1px solid #1f2a3a;">
                <span style="font-size:18px;font-weight:700;letter-spacing:-0.02em;color:#f8fafc;">Rift</span><span style="font-size:18px;font-weight:700;letter-spacing:-0.02em;color:#2dd4bf;">Drop</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">${content}</td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid #1f2a3a;font-size:12px;color:#94a3b8;">
                You got this email because something happened on your RiftDrop account.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function emailButton(label: string, href: string): string {
  return `<a href="${href}" style="display:inline-block;background:#2dd4bf;color:#070b12;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:10px;font-size:14px;">${label}</a>`;
}
