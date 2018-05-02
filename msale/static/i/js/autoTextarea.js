//var maxHeight=null
//var qrysTextareacClas=document.querySelector(".freebackReplyTextarea")
//var minHeight=qrysTextareacClas.offsetHeight//������ʼ�߶�

function HAuto(qrysTextareacClas,minHeight){

    var height,style=qrysTextareacClas.style
    qrysTextareacClas.style.height =minHeight + 'px'
    console.log(qrysTextareacClas.scrollHeight)
    if (qrysTextareacClas.scrollHeight >minHeight) {
        if (qrysTextareacClas.maxHeight && qrysTextareacClas.scrollHeight > qrysTextareacClas.maxHeight) {
            height = qrysTextareacClas.maxHeight;
            style.overflowY = 'scroll'
            
        } else {
            height = qrysTextareacClas.scrollHeight;
            style.overflowY = 'hidden'


        }
        style.height = height  + 'px'

    }
}
