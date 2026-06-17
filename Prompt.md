# Prompt

## 功能

根据产品图和描述，生成适用于 Gem Image 的电商产品展示 Prompt。

---

## 输入

- **产品**：{product_name}
- **需求**：{feature_list}（如反光条、拉链、袖口、胸前口袋）
- **规格**：{specifications}（如比例、画质、风格）

---

## 输出格式

`
[产品名称] 四宫格细节图

左上：{detail_1}
左下：{detail_2}
右上：{detail_3}
右下：{detail_4}

比例：{width}:{height}
画质：4K
风格：电商摄影，自然光
材质：真实呈现

禁止增加：logo、纽扣、多余口袋
禁止改变：颜色、布料
`

---

## 使用示例

见 GemPrompt.md（夏季工装夹克已适配示例）
