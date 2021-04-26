import { PostModel, UserModel, PostLikeModel } from '../model'

// 获取首页最近博客
export const getRecentPost = async (userId: number) => {
  const recentPostList = await PostModel.findAll({
    limit: 2,
    order: [['publishTime', 'DESC']],
    include: [
      {
        model: UserModel,
        attributes: ['name', 'gender'],
        required: true
      },
      {
        model: PostLikeModel,
        attributes: ['accountId']
      }
    ]
  })

  const res = []
  for (const item of recentPostList) {
    res.push({
      id: item.id,
      articleContent: item.content,
      publishTime: item.publishTime,
      userName: item.user!.name,
      gender: item.user!.gender,
      postLikes: item.postLikes!.length,
      alreadyLike: item.postLikes!.filter((x) => x.accountId === userId).length > 0
    })
  }

  return res
}

export const togglePostLike = async (postId: number, userId: number) => {
  const likeRes = await PostLikeModel.findOne({
    where: {
      postId,
      accountId: userId
    }
  })

  if (!likeRes) {
    const newPostLikeRes = await PostLikeModel.create({
      postId,
      accountId: userId
    })

    return newPostLikeRes
  }

  await PostLikeModel.destroy({
    where: {
      postId,
      accountId: userId
    }
  })
  return likeRes
}
