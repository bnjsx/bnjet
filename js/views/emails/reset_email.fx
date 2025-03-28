<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      padding: 40px;
      text-align: center;
    }

    .email-header {
      margin-bottom: 30px;
    }

    .email-header h1 {
      font-size: 26px;
      color: #333;
      font-weight: 600;
    }

    .email-body {
      font-size: 16px;
      color: #555;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .email-body p {
      margin-bottom: 20px;
    }

    .reset-button {
      display: inline-block;
      background-color: #3490dc;
      color: #fff;
      padding: 12px 24px;
      font-size: 18px;
      font-weight: bold;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s, transform 0.3s;
    }

    .reset-button:hover {
      background-color: #2779bd;
      transform: translateY(-2px);
    }

    .footer {
      font-size: 14px;
      color: #777;
      margin-top: 30px;
    }

    .footer p {
      margin: 0;
    }

    .footer a {
      color: #3490dc;
      text-decoration: none;
    }

    @media only screen and (max-width: 600px) {
      .email-container {
        padding: 20px;
        max-width: 100%;
      }

      .email-header h1 {
        font-size: 22px;
      }

      .reset-button {
        font-size: 16px;
        padding: 10px 20px;
      }
    }
  </style>
</head>

<body>

  <div class="email-container">
    <!-- Header -->
    <div class="email-header">
      <h1>Password Reset Request</h1>
    </div>

    <!-- Main Content -->
    <div class="email-body">
      <p>We received a request to reset your password. If you did not make this
        request, you can safely ignore this email. To reset your password, click
        the button below:</p>

      <!-- Reset Button -->
      <a href="$(link)" class="reset-button">Reset Your Password</a>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>© $(@year()) $(#app_name). All rights reserved.</p>
    </div>
  </div>

</body>

</html>