<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>公式LINE 友だち登録</title>
  <style>
    :root {
      --line: #06c755;
      --text: #222;
      --sub: #666;
      --bg: #f7f8fa;
      --card: #fff;
      --border: #e8e8e8;
      --shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      --radius: 22px;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif;
      color: var(--text);
      background: linear-gradient(180deg, #f4fff8 0%, var(--bg) 220px);
      line-height: 1.7;
    }

    .wrap {
      width: min(100%, 760px);
      margin: 0 auto;
      padding: 24px 16px 56px;
    }

    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 28px 20px;
    }

    .hero {
      text-align: center;
      padding-top: 32px;
    }

    .avatar {
      width: 112px;
      height: 112px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #fff;
      box-shadow: 0 6px 20px rgba(0,0,0,.12);
      background: #eee;
    }

    h1 {
      margin: 18px 0 10px;
      font-size: 1.9rem;
      line-height: 1.35;
    }

    .lead {
      margin: 0;
      color: var(--sub);
      font-size: 1rem;
    }

    .cta {
      display: inline-block;
      margin-top: 20px;
      background: var(--line);
      color: #fff;
      text-decoration: none;
      font-weight: 700;
      padding: 15px 26px;
      border-radius: 999px;
      box-shadow: 0 8px 18px rgba(6, 199, 85, .26);
    }

    .or {
      text-align: center;
      color: var(--sub);
      margin: 24px 0;
      font-weight: 700;
    }

    .section {
      margin-top: 18px;
      padding: 22px 18px;
      border: 1px solid var(--border);
      border-radius: 18px;
      background: #fff;
    }

    h2 {
      margin: 0 0 6px;
      font-size: 1.2rem;
    }

    .desc {
      margin: 0 0 14px;
      color: var(--sub);
      font-size: .95rem;
    }

    .line-id-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
      padding: 14px 16px;
      background: #f7faf8;
      border-radius: 14px;
      border: 1px dashed #cfe8d8;
    }

    .line-id {
      font-size: 1.4rem;
      font-weight: 800;
      letter-spacing: .03em;
    }

    .copy-btn,
    .save-btn {
      border: 0;
      border-radius: 999px;
      padding: 12px 18px;
      font-weight: 700;
      cursor: pointer;
      background: #111;
      color: #fff;
    }

    ol {
      margin: 14px 0 0 20px;
      padding: 0;
    }

    .qr-wrap {
      text-align: center;
      margin-top: 14px;
    }

    .qr {
      width: min(100%, 280px);
      border-radius: 16px;
      border: 1px solid var(--border);
      background: #fff;
      padding: 10px;
      box-shadow: 0 4px 14px rgba(0,0,0,.06);
    }

    .footer-note {
      margin-top: 24px;
      text-align: center;
      color: #3b3b3b;
      font-weight: 600;
    }

    @media (max-width: 520px) {
      h1 { font-size: 1.55rem; }
      .card { padding: 24px 16px; }
      .line-id { font-size: 1.2rem; }
    }
  </style>
</head>
<body>
  <main class="wrap">
    <section class="card hero">
      <img class="avatar" src="profile.jpg" alt="プロフィール写真" />
      <h1>物販ONE講師の仲井です！</h1>
      <p class="lead">皆さんとお話しするのを楽しみにしています</p>
      <a class="cta" href="https://lin.ee/sAPHudq" target="_blank" rel="noopener noreferrer">友だち追加する</a>

      <div class="or">または</div>

      <section class="section">
        <h2>LINE IDで追加</h2>
        <p class="desc">LINEアプリの検索からも追加できます</p>
        <div class="line-id-box">
          <div class="line-id" id="lineId">@372kwwhn</div>
          <button class="copy-btn" id="copyBtn">LINE IDをコピー</button>
        </div>
        <ol>
          <li>LINEアプリを開く</li>
          <li>ホーム右上の「友だち追加」を押す</li>
          <li>「検索」を押す</li>
          <li>「@372kwwhn」を入力して追加する</li>
        </ol>
      </section>

      <section class="section">
        <h2>QRコードで追加</h2>
        <p class="desc">直接読み取るか、保存して追加できます</p>
        <div class="qr-wrap">
          <img class="qr" src="line-qr.png" alt="LINE QRコード" />
        </div>
        <p style="margin-top:14px;">
          <button class="save-btn" id="saveBtn">QRコードを保存する</button>
        </p>
        <ol>
          <li>LINEアプリを開く</li>
          <li>「友だち追加」→「QRコード」を押す</li>
          <li>このQRコードを読み取る</li>
          <li>読み取れない場合は保存画像から追加する</li>
        </ol>
      </section>

      <p class="footer-note">追加後にひとこと送っていただけると<br>スムーズにご案内できます。</p>
    </section>
  </main>

  <script>
    const lineId = document.getElementById('lineId').textContent.trim();
    const copyBtn = document.getElementById('copyBtn');
    const saveBtn = document.getElementById('saveBtn');

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(lineId);
        copyBtn.textContent = 'コピーしました';
        setTimeout(() => (copyBtn.textContent = 'LINE IDをコピー'), 1800);
      } catch {
        alert('コピーできませんでした。手動でコピーしてください。');
      }
    });

    saveBtn.addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = 'line-qr.png';
      a.download = 'line-qr.png';
      a.click();
    });
  </script>
</body>
</html>
