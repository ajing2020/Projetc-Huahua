import tagListModel from "@/models/tagListModel";
function createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
      window.createTag(name);
    }
  }

export default createTag