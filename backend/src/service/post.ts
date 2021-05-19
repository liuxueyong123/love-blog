import { WhereOptions } from 'sequelize'
import { PostModel, UserModel, PostLikeModel, PostCommentModel, PostTypeModel } from '../model'

export const getPostById = async (postId: number) => {
  const res = await PostModel.findOne({
    where: {
      id: postId
    }
  })

  return res
}

export const getPostTypeById = async (typeId: number) => {
  const res = await PostTypeModel.findOne({
    where: {
      id: typeId
    }
  })

  return res
}

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

// 切换博客喜欢状态
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

// 博客页面加载博客
export const getPosts = async (userId: number, page: number, timeOrder: string, typeId: number) => {
  const postWhere: WhereOptions = {}

  if (typeId !== 0) {
    postWhere.typeId = typeId
  }

  const postListRes = await PostModel.findAll({
    limit: 10,
    offset: (page - 1) * 10,
    order: [
      ['publishTime', timeOrder],
      [PostCommentModel, 'publishTime', 'asc']
    ],
    where: postWhere,
    include: [
      {
        model: UserModel,
        attributes: ['name', 'gender'],
        required: true
      },
      {
        model: PostLikeModel,
        attributes: ['accountId']
      },
      {
        model: PostCommentModel,
        attributes: ['content'],
        include: [
          {
            model: UserModel,
            attributes: ['name']
          }
        ]
      }
    ]
  })

  const res = []
  for (const item of postListRes) {
    res.push({
      id: item.id,
      gender: item.user!.gender,
      writer: item.user!.name,
      publishTime: item.publishTime,
      content: item.content,
      imgList: item.imgList,
      postComments: item.postComments?.map((x) => ({ content: x.content, writer: x.user!.name })) || [],
      postLikes: item.postLikes!.length,
      alreadyLike: item.postLikes!.filter((x) => x.accountId === userId).length > 0
    })
  }

  return res
}

// 提交博客评论
export const createPostComment = async (userId: number, postId: number, comment: string) => {
  const res = await PostCommentModel.create({
    accountId: userId,
    content: comment,
    postId
  })

  return res
}

export const createPost = async (userId: number, typeId: number, content: string, imgList: string[]) => {
  const res = await PostModel.create({
    publisherId: userId,
    content,
    typeId,
    imgList: JSON.stringify(imgList)
  })

  return res
}

// 获取所有的 post 类型
export const getPostTypes = async () => {
  const res = await PostTypeModel.findAll()

  return res
}
