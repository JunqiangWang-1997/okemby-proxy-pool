// 文件路径: /functions/api/nodes.js

export async function onRequest(context) {
  // 1. 获取数据库 (记得去 Pages 设置里绑定变量名 DB)
  const db = context.env.DB;

  try {
    // 2. 查库：拿出所有 active 的节点，按用量排序
    const { results } = await db.prepare(
      "SELECT owner_name, proxy_url, today_usage, ip_segment, status FROM nodes WHERE status = 'active' ORDER BY today_usage ASC"
    ).all();

    // 3. 把查到的结果扔给前端
    return new Response(JSON.stringify(results), {
      headers: {
        "Content-Type": "application/json"
      },
    });
  } catch (err) {
    // 如果出错，告诉前端错哪了
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}