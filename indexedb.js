/**
 * Minified by jsDelivr using UglifyJS v3.4.4.
 * Original file: /npm/idb@3.0.2/build/idb.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).idb={})}(this,function(e){"use strict";function u(n){return new Promise(function(e,t){n.onsuccess=function(){e(n.result)},n.onerror=function(){t(n.error)}})}function i(n,o,r){var i,e=new Promise(function(e,t){u(i=n[o].apply(n,r)).then(e,t)});return e.request=i,e}function t(e,n,t){t.forEach(function(t){Object.defineProperty(e.prototype,t,{get:function(){return this[n][t]},set:function(e){this[n][t]=e}})})}function n(t,n,o,e){e.forEach(function(e){e in o.prototype&&(t.prototype[e]=function(){return i(this[n],e,arguments)})})}function o(t,n,o,e){e.forEach(function(e){e in o.prototype&&(t.prototype[e]=function(){return this[n][e].apply(this[n],arguments)})})}function r(e,o,t,n){n.forEach(function(n){n in t.prototype&&(e.prototype[n]=function(){return e=this[o],(t=i(e,n,arguments)).then(function(e){if(e)return new s(e,t.request)});var e,t})})}function c(e){this._index=e}function s(e,t){this._cursor=e,this._request=t}function p(e){this._store=e}function a(n){this._tx=n,this.complete=new Promise(function(e,t){n.oncomplete=function(){e()},n.onerror=function(){t(n.error)},n.onabort=function(){t(n.error)}})}function f(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new a(n)}function d(e){this._db=e}t(c,"_index",["name","keyPath","multiEntry","unique"]),n(c,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),r(c,"_index",IDBIndex,["openCursor","openKeyCursor"]),t(s,"_cursor",["direction","key","primaryKey","value"]),n(s,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(n){n in IDBCursor.prototype&&(s.prototype[n]=function(){var t=this,e=arguments;return Promise.resolve().then(function(){return t._cursor[n].apply(t._cursor,e),u(t._request).then(function(e){if(e)return new s(e,t._request)})})})}),p.prototype.createIndex=function(){return new c(this._store.createIndex.apply(this._store,arguments))},p.prototype.index=function(){return new c(this._store.index.apply(this._store,arguments))},t(p,"_store",["name","keyPath","indexNames","autoIncrement"]),n(p,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),r(p,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),o(p,"_store",IDBObjectStore,["deleteIndex"]),a.prototype.objectStore=function(){return new p(this._tx.objectStore.apply(this._tx,arguments))},t(a,"_tx",["objectStoreNames","mode"]),o(a,"_tx",IDBTransaction,["abort"]),f.prototype.createObjectStore=function(){return new p(this._db.createObjectStore.apply(this._db,arguments))},t(f,"_db",["name","version","objectStoreNames"]),o(f,"_db",IDBDatabase,["deleteObjectStore","close"]),d.prototype.transaction=function(){return new a(this._db.transaction.apply(this._db,arguments))},t(d,"_db",["name","version","objectStoreNames"]),o(d,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(i){[p,c].forEach(function(e){i in e.prototype&&(e.prototype[i.replace("open","iterate")]=function(){var e,t=(e=arguments,Array.prototype.slice.call(e)),n=t[t.length-1],o=this._store||this._index,r=o[i].apply(o,t.slice(0,-1));r.onsuccess=function(){n(r.result)}})})}),[c,p].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,n){var o=this,r=[];return new Promise(function(t){o.iterateCursor(e,function(e){e?(r.push(e.value),void 0===n||r.length!=n?e.continue():t(r)):t(r)})})})}),e.openDb=function(e,t,n){var o=i(indexedDB,"open",[e,t]),r=o.request;return r&&(r.onupgradeneeded=function(e){n&&n(new f(r.result,e.oldVersion,r.transaction))}),o.then(function(e){return new d(e)})},e.deleteDb=function(e){return i(indexedDB,"deleteDatabase",[e])},Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=/sm/0e3ec4bf7383e5696da0b5746c3ede302febe62e777a230a14d70a2475b88be8.map


const DBMgr = function() {
  const TABLE_NAME = "books";
  const DB_NAME = "booksDb";
  const VERSION = 1;
  let db;

  this.init = async () =>{
    db = await idb.openDb(DB_NAME, VERSION, r => {
      r.createObjectStore(TABLE_NAME, {keyPath: 'key'});
    });
  };

  this.all =  async () =>{
    let tx = db.transaction(TABLE_NAME);
    let bookStore = tx.objectStore(TABLE_NAME);
    return await bookStore.getAll();
  };

  this.clearAll = async () => {
    let tx = db.transaction(TABLE_NAME, 'readwrite');
    await tx.objectStore(TABLE_NAME).clear();
  };

  this.remove = async  (key) => {
    let tx = db.transaction(TABLE_NAME, 'readwrite');
    await tx.objectStore(TABLE_NAME).delete(key);
  };

  this.put = async  (item) => {
    let tx = db.transaction(TABLE_NAME, 'readwrite');
    await tx.objectStore(TABLE_NAME).put(item);
  };
  this.add = async  (item) => {
    let tx = db.transaction(TABLE_NAME, 'readwrite');
    await tx.objectStore(TABLE_NAME).add(item);
  }
};


