window.state = new device.state({
    state: 'stop', type: 'cpu'
});

/*--──────────────────────────────────────────────────────────────────────────────────────--*/
    
const index = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
        
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
        
    [0, 4, 8],
    [2, 4, 6],
];

/*--──────────────────────────────────────────────────────────────────────────────────────--*/

function resetGame(){ stopGame(); window.state.set({ state: 'play' }); }

function playGame(){
    stopGame(); window.state.set({
        type: Math.ceil(Math.random()*2-1) ? 'cpu' : 'human'
    });
}

function stopGame(){
    _$('a[value]').map(x=>x.setAttribute('value',''));
} 

/*--──────────────────────────────────────────────────────────────────────────────────────--*/

function validator( callback ){
    let body = -1; index.some(x=>{ 
        let acum = 0, el = _$('[button]'); 

        x.some(x=>{ 
            const filter = el[x].getAttribute('value');
            if( (/X|O/i).test( filter ) ) return false;
                body = x; return true;
        })

        for( let i of x ){
            acum += el[i].getAttribute('value') == 'O' ? 1 : 
                    el[i].getAttribute('value') == 'X' ?-1 : 0;
            if( callback(acum) ) return true;
        }

        return false;
    }); 

    if( body<0 ) _$('[button]').some((x,i)=>{
        if( (/X|O/i).test(x.getAttribute('value')) ) return false;
        body = i; return true;
    });

    return body;
}

window.state.observeField('type',(prev,act)=>{
    const { state, type } = window.state.state;
    if( type == 'human' ) return 0; 
    
    try {
        let body = validator(acum=>( acum <= -2 || acum >= 2 ));
        _$('[button]')[body].setAttribute('value','X');
        window.state.set({ type:'human' });
    } catch(e) {  }

    setTimeout( isGameFinished,1000  );
})

function isGameFinished(){

    validator(acum=>{ if( acum == -3 || acum == 3 ){
        const color = acum >= 3 ? 'blue' : 'red';
        UIkit.notification(`${color} wins`);
        window.state.set({ state:'reset' }); 
        return true;
    }   return false;   })

    if( _$('[button]').every(x=>x.getAttribute('value')!='') ){
        window.state.set({ state:'reset' });
        UIkit.notification(`No one wins`);
    }
}

/*--──────────────────────────────────────────────────────────────────────────────────────--*/

window.state.observeField('state',(prev,act)=>{
    switch (act) {
        case 'reset': resetGame(); break; 
        case 'play':  playGame(); break;
        case 'stop':  stopGame(); break;
    }
})

/*--──────────────────────────────────────────────────────────────────────────────────────--*/
