# AI Decision Dashboard 交接问题清单

## 给 Member 2：Backend AI Specialist

我需要确认 AI 推荐接口的细节：

1. 获取 AI 推荐的接口路径是什么？

   示例：

   ```text
   GET /api/ai/recommendations?date=2026-04-27
   ```

2. 推荐接口返回的 JSON 格式是什么？

   我目前前端使用的格式是：

   ```json
   {
     "recommendations": [
       {
         "id": "rec_001",
         "name": "Grilled Salmon Bowl",
         "reason": "Good protein after strength training.",
         "tags": ["High Protein", "Omega-3"],
         "calories": 520,
         "protein": 38,
         "carbs": 42,
         "fat": 18,
         "confidence": 92
       }
     ]
   }
   ```

3. 如果 AI 生成失败，会返回什么错误格式？

4. AI 推荐是否会包含早餐、午餐、晚餐分类，还是统一推荐后由前端保存成 Dinner？

## 给 Member 3：Frontend Lead

我需要确认前端项目结构和公共工具：

1. 我的组件应该放在哪个目录？

   目前建议：

   ```text
   src/components/ai/
   ```

2. 项目里是否已经封装了 Axios？

   如果有，我会把 `src/services/aiRecommendationApi.ts` 里的 mock 调用替换成统一的 API helper。

3. `selectedDate` 从哪个 Pinia store 读取？

4. 保存成功后，是否有统一的 toast/message 组件？

5. 是否已有 Tailwind CSS 或 UI 组件库规范？

## 给 Member 4：Frontend UI - Interactive Timeline

我需要确认推荐保存为 Dinner 后，Timeline 怎么更新：

1. 我点击 `Accept as Dinner` 保存成功后，你的 timeline 是否需要重新请求当天 meals？

2. 保存成功后是否要触发某个事件？

   示例：

   ```ts
   emit('accepted', meal)
   ```

3. Timeline 需要我返回完整 meal 数据，还是只需要通知你刷新？

