# 04 - Deep Dive: JSON Web Tokens (JWT) in Microservices

Authentication in distributed microservice architectures requires a mechanism that does not depend on a central in-memory session. This guide explains how **JSON Web Tokens (JWT)** fulfill this role in SmartBus Travel.

---

## 1. What is a JWT?
A **JSON Web Token (JWT)** is an open, industry-standard (RFC 7519) compact and self-contained way for securely transmitting information between parties as a JSON object.

## 2. Structure of a JWT
A JWT consists of three parts separated by dots (`.`):
```
header.payload.signature
```

### A. Header
Contains metadata:
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### B. Payload (Claims)
Contains information claims:
```json
{
  "sub": "6705ab89d34e912a",
  "email": "john@example.com",
  "role": "ROLE_USER",
  "iat": 1760000000,
  "exp": 1760086400
}
```

### C. Signature
Created by hashing the encoded header, encoded payload, and a secret key:
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secretKey
)
```

## 3. How SmartBus Travel Uses JWTs
1. **Issuance**: Issued upon successful login in `auth-service`.
2. **Storage**: Stored in `localStorage` under key `smartbus_token`.
3. **Transmission**: Sent via HTTP Header: `Authorization: Bearer <accessToken>`.
4. **Validation**: Validated by `JwtAuthenticationFilter` on incoming requests.
