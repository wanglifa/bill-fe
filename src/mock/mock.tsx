import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios';

type Mock = (config: AxiosRequestConfig) => [number, any]

faker.setLocale('zh_CN');

export const mockItemIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26
  const createPaper = (page = 1) => ({
    page,
    per_page,
    count,
  })
  const createItem = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      user_id: createId(),
      amount: Math.floor(Math.random() * 10000),
      tags_id: [createId()],
      happen_at: faker.date.past().toISOString(),
      kind: config.params.kind,
    }))
  const createBody = (n = 1, attrs?: any) => ({
    resources: createItem(n),
    pager: createPaper(page),
  })
  if (!page || page === 1) {
    return [200, createBody(25)]
  } else if (page === 2) {
    return [200, createBody(1)]
  }else{
    return [200, {}]
  }
}
export const mockTagEdit: Mock = config => {
  const createTag = (attrs?: any) =>
    ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: 'expenses',
      ...attrs
    })
  return [200, {resource: createTag()}]
}

export const mockTagShow: Mock = config =>{
  const createTag = (attrs?: any) =>
    ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: 'expenses',
      ...attrs
    })
  return [200, {resource: createTag()}]
}

export const mockItemCreate: Mock = config => {
  return [200, {
    resource: {
      "id": 2264,
      "user_id": 1312,
      "amount": 9900,
      "note": null,
      "tags_id": [3508],
      "happen_at": "2020-10-29T16:00:00.000Z",
      "created_at": "2022-07-03T15:35:56.301Z",
      "updated_at": "2022-07-03T15:35:56.301Z",
      "kind": "expenses"
    }
  }]
}
export const mockSession: Mock = (config) => {
  return [200, {
    jwt: faker.random.word()
  }]
}

let id = 0
const createId = () => {
  id += 1
  return id
}
export const mockTagIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26
  const createPaper = (page = 1) => ({
    page, per_page, count
  })
  const createTag = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: config.params.kind,
      ...attrs
    }))
  const createBody = (n = 1, attrs?: any) => ({
    resources: createTag(n), pager: createPaper(page)
  })

  if (kind === 'expenses' && (!page || page === 1)) {
    return [200, createBody(25)]
  } else if (kind === 'expenses' && page === 2) {
    return [200, createBody(1)]
  } else if (kind === 'income' && (!page || page === 1)) {
    return [200, createBody(25)]
  } else {
    return [200, createBody(1)]
  }

}