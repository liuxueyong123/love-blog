import { ArticleModel, UserModel } from '../model'

// 获取首页最近文章
export const getRecentArticle = async (userId: number) => {
  const recentArticleList = await ArticleModel.findAll({
    limit: 2,
    order: [['publishTime', 'DESC']],
    include: [
      {
        model: UserModel,
        attributes: ['name', 'gender'],
        required: true
      }
    ]
  })

  const res = []
  for (const item of recentArticleList) {
    res.push({
      id: item.id,
      publishTime: item.publishTime,
      title: item.title,
      userName: item.user!.name,
      gender: item.user!.gender
    })
  }

  return res
}
