FROM mcr.microsoft.com/devcontainers/base:debian

RUN apt update && apt install -y \
    fish \
    python3-pip \
    python3-venv \
    pipx \
    curl \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

RUN pipx install --system-site-packages yt-dlp

# Ensure yt-dlp is globally available and owned by vscode
RUN ln -sf /home/vscode/.local/bin/yt-dlp /usr/local/bin/yt-dlp

# Install Bun system-wide
RUN curl -fsSL https://bun.sh/install | bash && \
    mv /root/.bun/bin/bun /usr/local/bin/bun && \
    mv /root/.bun /usr/local/bun

# Ensure Bun is executable and add to PATH
RUN chmod -R 777 /usr/local/bun && \
    chmod +x /usr/local/bin/bun

ENV BUN_INSTALL="/usr/local/bun"
ENV PATH="/usr/local/bun/bin:$PATH"
ENV PATH="/root/.local/bin:$PATH"

WORKDIR /workspaces/youtube-semantic-search

# Ensure all working directories are writable
RUN mkdir -p /workspaces/youtube-semantic-search/data && \
    chmod -R 777 /workspaces/youtube-semantic-search/data && \
    chown -R vscode:vscode /workspaces/youtube-semantic-search

# Add aliases for bash and fish
RUN echo 'alias run-transcript="bun run src/index.ts --video https://youtu.be/NQ1p57yvQho --query \"What was said about AI?\""' >> /home/vscode/.bashrc && \
    mkdir -p /home/vscode/.config/fish && \
    echo 'alias run-transcript="bun run src/index.ts --video https://youtu.be/NQ1p57yvQho --query \"What was said about AI?\""' >> /home/vscode/.config/fish/config.fish >> /home/vscode/.bashrc && \
    echo 'alias run-transcript="bun run src/index.ts --video https://youtu.be/NQ1p57yvQho --query \"What was said about AI?\""' >> /home/vscode/.config/fish/config.fish

USER vscode

COPY package.json bun.lock ./

RUN bun install

COPY . .

SHELL ["/usr/bin/fish", "-c"]

CMD ["sleep", "infinity"]
