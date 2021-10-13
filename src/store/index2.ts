import tagListModel from '@/models/tagListModel'
import recordListModel from '@/models/recordListModel'

const store = {
    //record store
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => recordListModel.create(record),

    //tag store
    tagList: tagListModel.fetch(),
    findTag(id: string) {
        return this.tagList.filter((t) => t.id === id)[0];
    },
    createTag: (name: string) => {
        const message = tagListModel.create(name);
        if (message === "duplicated") {
            window.alert("标签重复");
        } else if (message === "success") {
            window.alert("标签名添加成功");
        }
    },
    removeTag: (id: string) => {
        if (tagListModel.remove(id)) {
            window.alert('删除成功')
            return true
        } else {
            window.alert('删除失败')
            return false
        }
    },
    updateTag: (id: string, name: string) => {
        return tagListModel.update(id, name)
    }
}

export default store