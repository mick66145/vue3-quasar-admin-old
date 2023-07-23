export const genderTypes = {
  male: 'male',
  female: 'female',
}

export const genderTypeName = {
  [genderTypes.male]: '男',
  [genderTypes.female]: '女',
}

export const genderList = Object.keys(genderTypeName).map(key => ({
  name: genderTypeName[key],
  value: key,
}))
