# Node.js 이미지를 기반으로 시작
FROM node:20

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일들을 복사
COPY package.json yarn.lock ./

# 필요한 시스템 의존성 설치
RUN apt-get update && apt-get install -y \
    libgtk-3-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    fonts-noto-color-emoji \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 프로젝트 의존성 설치
RUN yarn install

# 나머지 소스 코드 복사
COPY . .

# 빌드 실행
RUN yarn build

# 서버 실행
CMD ["yarn", "start"]