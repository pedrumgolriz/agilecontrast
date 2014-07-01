'use strict';
var uiMixer = angular.module('uiMixer', []);
var paletteA = [
    {title: 'A', hex: '#124664'},
    {title: 'B', hex: '#238abe'},
    {title: 'C', hex: '#d12328'},
    {title: 'D', hex: '#751b19'},
    {title: 'E', hex: '#466931'},
    {title: 'F', hex: '#fbc05d'},
    {title: 'G', hex: '#ee975a'}
];
var paletteB = [
    {title: 'A', hex: '#8c979b'},  //0
    {title: 'B', hex: '#d2d3d2'},  //1
    {title: 'C', hex: '#abae72'},  //2
    {title: 'D', hex: '#859bc3'},  //3
    {title: 'E', hex: '#bad4e5'},  //4
    {title: 'F', hex: '#cddf9e'},  //5
    {title: 'G', hex: '#fff6d9'}   //6
];
var paletteC = [
    {title: 'A', hex: '#215470'},  //0
    {title: 'B', hex: '#000000'},  //1
    {title: 'C', hex: '#404041'},  //2
    {title: 'D', hex: '#939394'},  //3
    {title: 'E', hex: '#e6e6e7'},  //4
    {title: 'F', hex: '#ffffff'}   //5
];

var colorScheme = [
    {'title':'Main Header',     'fgHex': paletteC[5].hex, 'bgHex': paletteC[0].hex},  //0
    {'title':'Content Header',   'fgHex': paletteC[5].hex, 'bgHex': paletteC[3].hex},  //1
    {'title':'Content',          'fgHex': paletteC[0].hex, 'bgHex': paletteC[5].hex},  //3
    {'title':'Panel Header',    'fgHex': paletteC[5].hex, 'bgHex': paletteC[2].hex},  //4
    {'title':'Panel Content',   'fgHex': paletteC[0].hex, 'bgHex': paletteC[4].hex}   //5
];
//Using LeaVerou's Tool from GitHub
function calculate(r,g,b) {
    var a = [r,g,b].map(function(v) {
        v /= 255;
        return (v <= 0.03928) ?
            v / 12.92 :
            Math.pow( ((v+0.055)/1.055), 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

//Convert hexes to RGB values
function cutHex(h) {return (h.charAt(0)==='#') ? h.substring(1,7):h;}
function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16);}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16);}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16);}

uiMixer.controller('paletteAController', function($scope){
    $scope.paletteA = paletteA;
});

uiMixer.controller('paletteBController', function($scope){
    $scope.paletteB = paletteB;
});

uiMixer.controller('paletteCController', function($scope){
    $scope.paletteC = paletteC;
});

uiMixer.controller('colorSchemeController', function($scope){
    $scope.colorScheme = colorScheme;
    $scope.ratio = [];
    //if user changes values, update the array
    $scope.ratioCalc = function(val) {
        if(val) {
            for (var q = 0; q < $scope.colorScheme.length; q++) {
                if (val.title === colorScheme[q].title) {
                    $scope.colorScheme[q].fgHex = val.fgHex;
                    $scope.colorScheme[q].bgHex = val.bgHex;
                }
            }
        }
        for (var i = 0; i < $scope.colorScheme.length; i++) {
            //get RGB for each hex in the Object Array
            var result = '';
            var textR = hexToR($scope.colorScheme[i].fgHex);
            var backR = hexToR($scope.colorScheme[i].bgHex);
            var textG = hexToG($scope.colorScheme[i].fgHex);
            var backG = hexToG($scope.colorScheme[i].bgHex);
            var textB = hexToB($scope.colorScheme[i].fgHex);
            var backB = hexToB($scope.colorScheme[i].bgHex);
            //start the calculation
            //if bg > text
            if((textR+textG+textB) > (backR + backG + backB)){
                result = (calculate(textR, textG, textB) + 0.05) / (calculate(backR, backG, backB) + 0.05);
            }
            else{
                result = (calculate(backR, backG, backB) + 0.05) / (calculate(textR, textG, textB) + 0.05);
            }
            //if text >bg

            $scope.ratio[i] = result.toFixed(2);
        }
    };
    //run at least once
    $scope.ratioCalc();
});
