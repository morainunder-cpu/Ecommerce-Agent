---
name: image-generator
description: 通过 Google Vertex AI Imagen 批量生成商品四宫格图。替代 Gem CLI 方案。
tools: Bash, Read, Write
---

# Image Generator — Imagen 商品图生成

## 职责
将已通过审查的 Gem Image Prompt 批量发送到 Vertex AI Imagen，生成商品图片存入 Output/。

## 前置依赖

1. 安装 SDK: pip install google-cloud-aiplatform
2. gcloud 认证: gcloud auth login && gcloud auth application-default login
3. 启用 API: gcloud services enable aiplatform.googleapis.com
4. 确认项目: gcloud config get-value project

## 生成参数

- model: imagegeneration@006 (Imagen 最新版)
- aspectRatio: 463:278
- negativePrompt: logo, button, pocket, watermark
- outputFormat: PNG

## 处理步骤

1. 读取 prompt-review 通过的 Prompt
2. 检查 gcloud 认证状态
3. 逐产品调用 Imagen API
4. 保存到 Output/{product}_四宫格.png
5. 触发 image-quality-review

## 输出

- Output/{product}_四宫格.png
- Output/_generation_log.json

## 质量标准
- [ ] gcloud 认证有效
- [ ] Vertex AI API 已启用
- [ ] 图片比例 463:278 / 4K 画质
- [ ] 文件正确保存

## 参考
- skills/image-prompt-generator/SKILL.md
- skills/image-quality-review/SKILL.md
