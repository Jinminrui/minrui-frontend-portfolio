# minrui-frontend-portfolio

基于 React + Vite 构建的单页前端工程师个人网站，适合部署到 GitHub Pages。

## 本地开发

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
```

## GitHub Pages 部署

1. 在 GitHub 上创建一个新仓库。
2. 将当前目录推送到该仓库的 `main` 分支。
3. 进入 GitHub 仓库 `Settings -> Pages`。
4. 在 `Build and deployment` 中选择 `GitHub Actions`。
5. 后续每次推送到 `main`，都会自动触发 `.github/workflows/deploy.yml` 并部署站点。

## 内容维护

- 页面主体内容位于 `src/App.jsx`
- 样式位于 `src/styles.css`
- 构建配置位于 `vite.config.js`
