const storage_key = 'mall'
export default {
  // 1、存储值
  setItem(key, value, module_name) {
    if (module_name) {
      // （1）如果有指定模块，就先获取模块，将该模块上 key 属性的值存为 value
      let valModule = this.getItem(module_name)
      valModule[key] = value
      // （2）在传入的 key = valModule 上，存储最新的模块 valModule
      this.setItem(module_name, valModule)
    } else {
      // 将 key 属性的值存为 value
      let val = this.getStorage()
      val[key] = value
      window.sessionStorage.setItem(storage_key, JSON.stringify(val))
    }
  },

  //  2、获取 sessionStorage 下 key属性 的值
  getItem(key, module_name) {
    // 如果有模块，获取该模块下面的key属性 的值，eg：user 下面的 username
    if (module_name) {
      let valModule = this.getItem(module_name)
      if (valModule) return valModule[key]
    }
    return this.getStorage()[key]
  },

  // 3、按照 JSON 格式，根据storage_key 获取到 sessionStorage 里面的值
  getStorage() {
    return JSON.parse(window.sessionStorage.getItem(storage_key) || '{}')
  },

  // 4、清空某个属性值
  clear(key, module_name) {
    // 先根据storage_key 获取到 sessionStorage 里面的值
    // 如果有模块，就删除模块下的指定属性
    // 如果没有模块，就删除指定属性key的值
    let val = this.getStorage()
    if (module_name) {
      if (!val[module_name]) return
      delete val[module_name][key]
    } else {
      delete val[key]
    }
    window.sessionStorage.setItem(storage_key, JSON.stringify(val))
  }
}
