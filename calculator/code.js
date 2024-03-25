
var canvas = document.getElementById("canvas");
var plusbut = document.getElementById("plusbut");
var minusbut = document.getElementById("minusbut");
var plus = document.getElementById("createdplus")
var minus = document.getElementById("createdminus")
var inputbut = document.getElementById("inputbut");
var calcbut= document.getElementById("calcbut");


var type = "none";
var canset = false;

var lastitem = Element
var lastx = 0
var lasty = 0

var lastchangeitem = Element

canvas.onmouseover = canvset;
canvas.onmouseout = canvunset;

calcbut.onclick = calc;
plusbut.onclick = setplus;
minusbut.onclick = setminus;
inputbut.onclick = setinput;
canvas.onclick = set;
function canvset(event){
    canvas.style.background = "white";
    canset = true;
}
var qs = new Map();


function startmove(event){
    console.log(event.target.id)
    if (event.target.id != "canvas"){
        console.log(event.target.id)
        lastitem = event.target;
        console.log(event.target.id)
    }
    
}

function move(event){
    
    if (lastitem != null){
        lastitem.style.top = (event.pageY - 12.5)+ "px";
        lastitem.style.left = (event.pageX - 12.5) + "px";
    }
}

function stopmove(event){
    lastitem = null;
}


function set(event){
    if (type != "none" & event.target.id == "canvas" & type != "form"){
        
        var newimg = document.createElement('div');
        if (type == "minus"){
            newimg.innerHTML = "<img src = 'minus.png' id = '0' style = 'width: 25px; height:25px;'>";
            newimg.id = "createdminus";
            console.log("minus");
            
        }else if(type == "plus"){
            newimg.innerHTML = "<img src = 'plus.png' id = '0' style = 'width: 25px; height:25px;'>";
            newimg.id = "createdplus";
            console.log("plus");
        }else if (type == "input"){
            newimg.innerHTML = "<img src = 'krug.png' id = '0' style = 'width: 25px; height:25px;'>";
            newimg.id = "createdinput";
            
            console.log("input")

            for (var [key, value] of qs){
                if (value[0] == "createdplus" | value[0] == "createdminus"){
                    
                    qx = Number((key.style.left).replace("px", "")) + 12.5
                    qy = Number((key.style.top).replace("px", "")) + 12.5
                    ix = Number((event.pageX + 12.5))
                    iy = Number((event.pageY + 12.5))
                    dy = qy - iy
                    dx = ix - qx
                    console.log(dx + ':'+ dy)
                    if (dx >= 0){
                        angle = -Math.atan(dy/dx) * 180 / Math.PI }
                    else{
                        if (dy<0){
                        angle = 180 - Math.atan(dy/dx) * 180 / Math.PI }
                        else{
                            angle = 180 - Math.atan(dy/dx) * 180 / Math.PI }
                        
                    }

                    
                    console.log(angle)
                    mx = Number((qx + ix)/2)
                    my = Number((qy + iy)/2)
                    d = Math.sqrt((qx-ix)**2 + (qy-iy)**2)
                    var line = document.createElement("div")
                    
                    
                    
                    
                    canvas.appendChild(line)
                    line.style.transformOrigin = '0 center';
                    line.style.backgroundColor = 'black';
                    line.style .height = "10px"
                    line.style.rotate = 180 + angle +  "deg"
                    line.style.position = "absolute";
                    line.style.width  = d + "px";
                    
                    line.style.top = iy +  "px";
                    line.style.left = ix +   "px";
                    line.style.zIndex = 1
                    line.onclick = setparamsform;
                    line.id = "line"
                    qs.set(line,["line", 0, key, ])
                }

            }
        }
        
        
        
        canvas.appendChild(newimg)
        


        
        newimg.onclick = setparamsform;
        newimg.style.position = "absolute";
        newimg.style.top = event.pageY + "px";
        newimg.style.left = event.pageX + "px";
        newimg.style.zIndex = 2

        qs.set(newimg, [newimg.id, 0])

        
    }else if (type == "form" & event.target.id == "canvas"){
            var form = document.getElementById("form")
            form.remove()
        }
    
}


function calc(event){
    for (var [key, value] of qs){
        if (value[0] == "line"){
            let r = value[1]
            let q = qs.get(value[2])[1]
            let E = 9*10**9 * q /(r**2)
            console.log(E)
            var arrow = document.createElement("div")
            
            arrow.innerHTML = '<img src = "strelka.png" style = "width: 100px; height:30px; position: absolute; top:-10px; left:0; z-Index:1;"> <p style = "position:absolute; top: -20px; left: 20px">' + E + '</p>' 
            canvas.appendChild(arrow)



            arrow.style.transformOrigin = '0 center';
            
            arrow.style.zIndex = 1
            
            arrow.style.color = "black"
            arrow.style.height = "10px"
            arrow.style.rotate = 180 + Number(key.style.rotate.replace("deg", ""))+  "deg"
            arrow.style.position = "absolute";
            arrow.style.width  = 100 + "px";
                    
            arrow.style.top = iy +  "px";
            arrow.style.left = ix +   "px";

            



        }
    }
}
function setparamsform(event){
    
    
    console.log("click!!!")
    try {
        var lform = document.getElementById("form")
        lform.remove()
    }
    catch{}
    var form = document.createElement('form');
    
    form.innerHTML = '<label for="name">Заряд/Расстояние</label>   <input type="number" name = "q">    <button type="submit" value="click" >Отправить</button> '
    form.id = "form"
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const q = formData.get('q');
        
        if (event.target.id == 0){
            qs.set(event.target.parentElement, [qs.get(event.target.parentElement)[0], q]);
            let p = document.createElement("p")
            p.style = "position:absolute; top: -20px; left: -50%"
            
            
            
            p.textContent = q
            event.target.parentElement.appendChild(p)
        }else{

            qs.set(event.target, [qs.get(event.target)[0], q, qs.get(event.target)[2]]);
            let p = document.createElement("p")
            p.style = "position:absolute; top: -25px; left: 20px"
            
            p.style.rotate = 180 * Math.floor((Number(event.target.style.rotate.replace("deg", ""))-180)/180 )+ "deg"
            
            p.textContent = q
            event.target.appendChild(p)
        }
        
        
        form.remove()
        
      })
    type = "form"
    lastchangeitem = event.target;
    canvas.append(form);
    console.log("click!!!")
    
    

}


function canvunset(event){
    
    canset = false;
    
}

function setplus(event){
    
    type = "plus";
    

}

function setinput(event){
    type = "input"
}
function setminus(event){
    
    type = "minus";
}