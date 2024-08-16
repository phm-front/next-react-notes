'use client';

import { useState } from 'react';

export default function SignIn() {
  const [csrfToken, setCsrfToken] = useState();
  fetch('http://localhost:3000/api/auth/csrf')
    .then(res => res.json())
    .then(res => {
      setCsrfToken(res.csrfToken);
    });
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <label>
        Username
        <input name="username" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Sign in</button>
    </form>
  );
}
