# Ecommerce-Agent Dockerfile v0.6.2
# Multi-agent ecommerce content pipeline — Node.js runtime
# Build: docker build -t ecommerce-agent .
# Run:   docker run --env-file .env -v ${PWD}/Output:/app/Output ecommerce-agent

FROM node:18-alpine

LABEL org.opencontainers.image.title="ecommerce-agent"
LABEL org.opencontainers.image.description="舒特工贸多智能体电商内容生成管线"
LABEL org.opencontainers.image.version="0.6.2"

WORKDIR /app

# Copy MCP server
COPY mcp-server/package.json mcp-server/package.json
COPY mcp-server/index.js mcp-server/index.js
COPY mcp-server/skills/ mcp-server/skills/
COPY mcp-server/skills-index.json mcp-server/skills-index.json

# Copy pipeline scripts
COPY scripts/ scripts/

# Copy skills
COPY skills/ skills/

# Copy config
COPY config/ config/

# Copy catalog
COPY catalog/ catalog/

# Copy docs
COPY playbooks/ playbooks/
COPY templates/ templates/
COPY prompts/ prompts/

# Copy root files
COPY .env.example .env.example
COPY skills-index.json skills-index.json

# MCP server has zero external deps currently
RUN cd mcp-server && npm install --production 2>/dev/null || true

EXPOSE 3000

CMD ["node", "mcp-server/index.js"]