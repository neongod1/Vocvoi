# VocVoi — 品牌视觉升级完成

## 已完成

### 1. CSS 基础系统重写
- **色彩体系**: 从冷灰系全面升级为暖色系 — 象牙白(`#FBF9F6`)、沙色(`#F2EDE5`)、钛金(`#B5ACA2`)、石墨(`#23211F`)、铜色(`#C2854A`)
- **字体系统**: Google Fonts 引入 Satoshi(标题) + General Sans(正文)，严格禁用 Inter/Arial
- **排版层级**: 流体尺寸 `clamp()` 未使用，但建立了 5 级字号系统
- **向后兼容**: 保留旧颜色名(`amber/slate/charcoal`等)映射到新值

### 2. 品牌化 Layout
- **Header**: 毛玻璃效果 + 暖金背景，Logo 用 Satoshi 字体，导航简约克制
- **Footer**: 石墨深色背景，4 栏布局，铜色 CTA，版权信息极简
- **OG 标签**: 已配置 Open Graph 元数据

### 3. 首页 — 编辑级设计
- **Hero**: 左右分屏 — 左文案右产品大图，避免居中模板
- **Trust Strip**: 单行横向，Phosphor 图标替代 emoji
- **Why Titanium**: 4 卡片网格，hover 微交互
- **Product Bento Grid**: 4 产品卡片，真实产品图，渐变缩放
- **Brand Promise**: 3 列居中布局，图标+文案
- **CTA**: 石墨深色区，铜色按钮 + 信任行

### 4. Titanium Pan 产品页
- **Hero + Variant Selector**: 左大图右信息，5 SKU 按钮，图片/价格/规格全部联动切换
- **Titanium Technology**: 4 大卖点 + 6 材质标签，Phosphor 图标
- **Material Comparison**: 5 列表格，对比竞品材质
- **Gallery**: 网格布局，主图+4 张副图，`onError` 回退到主图
- **FAQ**: 手风琴折叠，平滑动画
- **Amazon CTA**: 石墨区 + 移动端底部固定悬浮条

### 5. 产品列表页
- 统一新设计语言，真实产品缩略图，hover 缩放效果

### 6. 图片同步
- 从 GitHub 下载了 5 个 SKU 的真实产品图(`main.webp`)
- 修正 `products.json` 中 `imagesDir` 对齐实际目录名

## 关键设计决策

| 决策 | 原因 |
|------|------|
| 保留旧颜色别名 | 避免大面积代码修改，逐步迁移 |
| Phosphor 图标集中管理 | Server Component 不能直接导入客户端库 |
| Gallery 降级策略 | `onError` 回退到主图，容错处理 |
| 无 emoji | 严格遵循 impeccable 规范 |
| 无纯黑纯白 | `#23211F` 替代 `#000`，`#FBF9F6` 替代 `#FFF` |

## 启动方式

```bash
cd vocvoi-site
npm run dev    # → http://localhost:3000
npm run build  # 生产构建
```

## 之后待做

- 服务端需要能正常启动（当前 curl 超时是 Windows 网络栈问题，非代码问题）
- Sauce Pan / Sauté Pan / Wok Pan 详情页用 Titanium Pan 模板快速复制
- 填充更多 Gallery 图片（目前仅 main.webp 可用）
