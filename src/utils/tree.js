// https://my.oschina.net/u/3024426/blog/5165582

// 廣度優先
export const breadthFirstSearch = (tree, func) => {
  let node; const list = [...tree]
  // eslint-disable-next-line no-cond-assign
  while (node = list.shift()) {
    func(node)
    node.childs && list.push(...node.childs)
  }
}
