import os, re

path = r"D:\Ecommerce-Agent\Output\全球工装品牌调研报告_20260623.md"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

# === Carhartt ===
# 1. Employees
c = c.replace("全球员工超过 3,000 人（近期公开报道）", "员工规模数千人，具体数字未公开披露")
# 2. Revenue
c = c.replace("行业普遍估计年销售额超过 10 亿美元", "行业普遍估计销售规模超过 15 亿美元")
# 3. Factories
c = c.replace("美国本土 4 个工厂（肯塔基州、田纳西州），生产核心 Duck 产品", "保留部分美国本土制造能力，同时采用全球供应链模式")

# === Engelbert Strauss ===
# 4. SKU
c = c.replace("约 10,000 SKU，强调款式多样化和快速上新", "SKU 数量庞大，覆盖建筑、制造、物流、医疗等多个行业")
# Also fix in cross-comparison table
c = c.replace("| **SKU 规模** | ~3,000 SKU | ~10,000 SKU | 数百万件在租 | 数万 SKU（多品牌） |",
              "| **SKU 规模** | ~3,000 SKU | SKU 数量庞大 | 数百万件在租 | 数万 SKU（多品牌） |")
# 5. Stores
c = c.replace("德国 3 家大型旗舰体验店（Workwearstore®，含咖啡厅、博物馆体验）", "德国及欧洲拥有多家大型体验中心（Workwearstore®）")

# === Cintas ===
# 6. B2B 100%
c = c.replace("| 模式 | **B2B 100%**（不向个人消费者销售） |", "| 模式 | **B2B**，业务几乎全部面向企业客户 |")
# 7. Market cap
c = c.replace("| 市值 | 约 $900 亿美元（2025年中） |", "| 市值 | 长期保持在全球制服服务行业领先水平 |")

# === VF Corporation ===
# 8. Update brand description and workwear positioning
old_vf_desc = "| 品牌组合 | 以户外和生活方式为核心，工装业务明显收缩 |"
new_vf_desc = "| 品牌组合 | 已完成 Dickies 剥离，战略重心进一步聚焦户外和生活方式品牌 |"
c = c.replace(old_vf_desc, new_vf_desc)

# 9. Update workwear section heading description
c = c.replace("Timberland PRO® 是 VF 目前最核心的工装业务：", "Timberland PRO® 为 VF 目前最重要的职业防护和工装相关业务：")

# 10. Update cross-comparison "2026最新状态" for VF
c = c.replace("| **2026最新状态** | 北美工装领导者 | 欧洲工装领导者 | 全球最大制服服务公司 | 以户外品牌为核心，工装业务明显收缩 |",
              "| **2026最新状态** | 北美工装领导者 | 欧洲工装领导者 | 全球最大制服服务公司 | 已完成工装剥离，聚焦户外和生活方式 |")

# 11. Update workwear positioning in comparison (Carhartt production)
c = c.replace("| **自产 vs 外包** | 部分自产+全球外包 | 100% 外包 | 10% 自产 / 90% 采购 | 100% 外包 |",
              "| **自产 vs 外包** | 部分自产+全球供应链 | 100% 外包 | 10% 自产 / 90% 采购 | 100% 外包 |")

# === Global Trends ===
# 12. Nearshoring: remove specific brand claims (Carhartt China->Mexico, Strauss Asia->Eastern Europe)
old_near = """| **Carhartt** | 中国 → 墨西哥 | 缩短供应链、降低地缘风险 |
| **VF Corporation** | 中国 → 越南 + 印度 | 分散供应链风险 |
| **Engelbert Strauss** | 亚洲 → 东欧/土耳其 | 缩短交货周期、降低关税 |"""
new_near = """| **VF Corporation** | 中国 → 越南 + 印度 | 分散供应链风险 |
| **行业观察** | 部分欧美品牌正将产能向近岸转移 | 缩短供应链、降低地缘风险 |
| **行业观察** | 部分欧洲品牌探索东欧/土耳其产能 | 缩短交货周期、降低关税 |"""
c = c.replace(old_near, new_near)

# 13. DPP: remove Strauss traceability claim, soften
old_dpp = "| 领先者 | Engelbert Strauss（Sympatex 已具备可追溯能力）、VF（2030 可持续承诺涵盖可追溯） |"
new_dpp = "| 行业进展 | Engelbert Strauss、VF 等欧洲市场参与者正持续加强供应链透明度建设，以应对未来 DPP 要求 |"
c = c.replace(old_dpp, new_dpp)

# 14. Nearshoring conclusion: remove "设计在中国+缝制在近岸" speculative claim
old_near_end = """趋势：**"中国+1"策略**成为主流，但中国在面料和辅料供应链上的深度短期内无法被替代，"设计在中国 + 缝制在近岸"可能成为新常态。"""
new_near_end = """趋势：**"中国+1"策略**成为行业共识，但中国在面料和辅料供应链上的深度短期内难以被替代，全球供应链格局正在经历结构性调整。"""
c = c.replace(old_near_end, new_near_end)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print(f"DONE. Size: {os.path.getsize(path)}")