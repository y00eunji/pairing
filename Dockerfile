# Stage 1: Build the Next.js application
FROM node:20-alpine AS builder

WORKDIR /app

# 1) pnpm 설치
RUN npm install -g pnpm

# 의존성 파일 복사 및 설치
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 애플리케이션 소스 복사
COPY . .

# 빌드 인수 설정
ARG NEXT_PUBLIC_REDIRECT_URI
ARG NEXT_PUBLIC_REDIRECT_URI_NAVER
ARG NEXT_PUBLIC_REDIRECT_URI_KAKAO
ARG NEXT_PUBLIC_KAKAO_REST_API_KEY
ARG NEXT_PUBLIC_NAVER_CLIENT_ID

# 환경 변수 설정 (빌드 시점에 클라이언트 측 환경 변수 주입)
ARG NEXT_PUBLIC_REDIRECT_URI=${NEXT_PUBLIC_REDIRECT_URI}
ARG NEXT_PUBLIC_REDIRECT_URI_NAVER=${NEXT_PUBLIC_REDIRECT_URI_NAVER}
ARG NEXT_PUBLIC_REDIRECT_URI_KAKAO=${NEXT_PUBLIC_REDIRECT_URI_KAKAO}
ARG NEXT_PUBLIC_KAKAO_REST_API_KEY=${NEXT_PUBLIC_KAKAO_REST_API_KEY}
ARG NEXT_PUBLIC_NAVER_CLIENT_ID=${NEXT_PUBLIC_NAVER_CLIENT_ID}

# Next.js 빌드
RUN pnpm run build

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

# ENV NODE_ENV=production
# NEXT_TELEMETRY_DISABLED=1 설정 시 Next.js 텔레메트리 비활성화
# ENV NEXT_TELEMETRY_DISABLED=1

# 빌드된 standalone 파일 복사
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# 필요한 의존성 설치 (프로덕션용)
COPY --from=builder /app/package.json /app/pnpm-lock.yaml  ./
RUN pnpm install --production --frozen-lockfile

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 서버 실행
CMD ["npm", "run", "start"]