// import clone from '@/lib/clone'



// const recordStore = {
//     recordList :[] as RecordItem[],
//     fetchRecords(): RecordItem[] {
//         this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
//         return this.recordList
//     },
//     createRecord(record: RecordItem) {
//         const record2: RecordItem = clone(record);
//         record2.createdAt = new Date();
//          this.recordList?.push(record2);
//         recordStore.saveRecords();
//     }
// }
// recordStore.fetchRecords();

// export default recordStore