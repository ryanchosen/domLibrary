console.log('hi')
const element=dom.create('   <tr><td>后面的节点</td></tr> ');
const element1=dom.create('   <tr><td>前面的节点</td></tr> ');
const element2=dom.create('   <tr><td>追加一个节点</td></tr> ');
const wrapper=dom.create('   <div id="newWrapper">新爸爸包在外面呢<div>111</div></div> ');
dom.after(test,element) // 页面上的test
dom.before(test,element1)
dom.append(test.parentNode,element2)
dom.wrap(test1,wrapper)

let arr=dom.empty(newWrapper)
let arr1=dom.empty(empty);
console.log(arr,arr1)

dom.attr(test,'hi','I\'m ryan');
console.log(dom.attr(test,'hi'));

dom.text(test,'testText')

dom.style(test,{border:'1px solid red',color:'blue'}) // 设置方式1
dom.style(test2,'border','1px solid blue') // 设置方式2
let styleValue=dom.style(test,'border') // 读取
console.log(styleValue)

dom.class.add(test,'red');
// dom.class.remove(test,'red');
let bool=dom.class.contains(test,'red');
console.log(bool);

//事件函数绑定与移除
const fn=()=>{
    console.log('点击了')
}
dom.on(test2,'click',fn)
// dom.off(test2,'click',fn)

const testDiv=dom.find('.test888')
console.log(testDiv)
const testDiv1=dom.find('.test888',test1000)
console.log(testDiv1)

console.log(dom.parent(test))


console.log(dom.siblings(test999))


console.log(dom.next(testDiv1[0]))

const t=dom.find('#travel')[0]
dom.each(dom.children(t),(item)=>dom.style(item,'color','red'))

console.log(dom.index(t2))