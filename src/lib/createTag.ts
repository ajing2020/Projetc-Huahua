import store from "@/store/index2";
function createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
      store.createTag(name);
    }
  }

export default createTag