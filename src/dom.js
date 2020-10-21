window.dom={
    //tr td根本无法在div中存在 考虑到这个问题 因此用了template
    //createAll 是错误的 因为这都没有遍历
    createAll(string){// 你敲什么我都给你
        const container = document.createElement("template");
        container.innerHTML=string;
        // 我是怎么知道用container.content去提取template内的#documentFragment？
        // 我debugger之后敲container.去逐一查看api，找意思相近的去试试
        return container.content.children
    },
    create(string){// 我只给你第一个
        const container = document.createElement("template");
        container.innerHTML=string;
        return container.content.firstElementChild
    },
    after(node1,node2){
        let insertedNode = node1.parentNode.insertBefore(node2,node1.nextElementSibling)
        return insertedNode
    },
    before(node1,node2){
        node1.parentNode.insertBefore(node2,node1);
    },
    append(parent,node){
        parent.appendChild(node)
    },
    wrap(node,parent){ // 新增一个爸爸(先插入到目标节点的前面，再把目标节点追加到新爸爸中)
        dom.before(node,parent)
        dom.append(parent,node)
    },
    remove(node){
        node.remove(node)
        return node
    },
    empty(node){
        console.log('下面是异步返回的，返回了空是正常的')
        console.dir(node.children) // 注意啊 这里返回的是空 因为是异步的 下面都已经全部删掉了 它才给你返回
        let arr=[];
        while(node.children[0]){
            let nodeRemoved=dom.remove(node.children[0]);
            arr.push(nodeRemoved)
        }
        return arr
    },
    attr(node,name,value){
        if(arguments.length===3){
            node.setAttribute(name,value)
        }else if(arguments.length===2){
            return node.getAttribute(name)
        }
        
    },
    text(node,string){ // 这种写法叫适配
        if(arguments.length===2){ // 这叫重载
            console.log(node.innerText)
            if('innerText' in node){ // 如果有node.innerText则用innerText
                node.innerText=string;
            }else{// 无则用textContent
                node.textContent=string; 
            }
        }
        if(arguments.length===1){
            if('innerText' in node){
                return node.innerText
            }else{
                return node.textContent
            }
        }
    },
    html(node,string){ 
        if(arguments.length===2){ 
           node.innerHTML(string) 
        }else if(arguments.length===1){
            return node.innerHTML
        }
    },
    style(node,value1,value2){
        if(arguments.length===2){
            if(arguments[1] instanceof Object){ // instanceof 判断更严谨一些 避免了 typeof null 为 'object'
                let obj=value1;
                for(let key in obj){
                    node.style[key] = obj[key] 
                }
            }else if(typeof arguments[1]==='string'){
                return node.style[value1]
            }
        }else if(arguments.length===3){
            node.style[value1] = value2
        }
        
    },
    class:{
        add(node,className){
            node.classList.add(className);
        },
        remove(node,className){
            node.classList.remove(className);
        },
        contains(node,className){
            return node.classList.contains(className);
        }
    },
    on(node,event,fn){
        node.addEventListener(event,fn);
    },
    off(node,event,fn){
        node.removeEventListener(event,fn);
    },
    find(selector,scopeNode){ // 支持在某个范围内查找
        // 如果传入范围，则在范围内找，没传入范围就全局找
        return (scopeNode||document).querySelectorAll(selector);
    },
    parent(node){
        return node.parentNode;
    },
    children(node){
        return node.children;
    },
    siblings(node){
        let nodeParentChildren=node.parentNode.children;
        let arr=Array.from(nodeParentChildren); // 伪数组转真数组
        return arr.filter(item=>item!==node) // 要把自身节点排除在外不要算在里面 
    },
    next(node){
        let x=node.nextSibling
        while(x&&x.nodeType===3){ // 循环找出一个不是文本节点的节点
            console.log('发现一个文本节点')
            x=x.nextSibling
        }
        return x
    },
    previous(node){
        let x=node.previousSibling
        while(x&&x.nodeType===3){ // 循环找出一个不是文本节点的节点
            console.log('发现一个文本节点')
            x=x.previousSibling
        }
        return x
    },
    each(nodeList,fn){
        for(let i=0;i<nodeList.length;i++){
            fn.call(null,nodeList[i])
        }
    },
    index(node){
        const list=dom.children(node.parentNode);
        let i
        for(i=0;i<list.length;i++){
            if(list[i]===node){
                break
            }
        }
        return i
    }
};