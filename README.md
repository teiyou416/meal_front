# Member 5 - AI Decision Dashboard 初步工作包

这是给 `Member 5: Frontend UI - AI Decision Dashboard` 准备的前端初始成果。

当前内容不依赖真实后端，先用 mock 数据完成：

- AI 推荐菜品卡片
- AI 生成中的 Skeleton Loading 状态
- 推荐失败或暂无推荐时的基础状态
- 点击 `Accept as Dinner` 的前端逻辑占位
- 和其他成员交接时需要确认的问题

## 你负责的范围

你的模块接收 AI 推荐数据，把它显示成用户能看懂的 Dashboard，并允许用户一键接受某个推荐，把它保存为晚餐。

简单说：

```text
AI/Backend 给你推荐数据
↓
你显示推荐卡片
↓
用户点击 Accept as Dinner
↓
你调用后端接口保存为 Dinner
```

## 文件说明

```text
src/components/ai/AIDecisionDashboard.vue
```

整个 AI 推荐面板。负责加载推荐、显示 loading、错误、空状态，以及处理用户点击接受推荐。

```text
src/components/ai/RecommendationCard.vue
```

单个推荐菜品卡片。负责展示菜名、推荐原因、标签、营养信息和接受按钮。

```text
src/components/ai/RecommendationSkeleton.vue
```

AI 正在生成推荐时显示的骨架屏。

```text
src/mocks/aiRecommendations.ts
```

假数据。等 Member 2 给出真实 API 后，可以用真实接口替换这里。

```text
src/services/aiRecommendationApi.ts
```

接口占位文件。现在返回 mock 数据，以后改成调用后端 API。

```text
src/types/aiRecommendation.ts
```

TypeScript 类型定义，规定推荐菜品应该有哪些字段。

```text
handoff-questions.md
```

交接时要问其他成员的问题。

```text
prototype.html
```

可直接在浏览器打开的静态原型，用来快速展示你的 Dashboard 想法。

## 建议开发顺序

1. 先打开 `prototype.html` 看整体效果。
2. 阅读 `src/types/aiRecommendation.ts`，理解推荐数据有哪些字段。
3. 阅读 `RecommendationCard.vue`，理解一张推荐卡片怎么组成。
4. 阅读 `AIDecisionDashboard.vue`，理解 loading、请求数据、点击保存之间的关系。
5. 和 Member 2、Member 3、Member 4 根据 `handoff-questions.md` 对接。

