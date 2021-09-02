var gnuplot = require('gnuplot');

const title = '"\nset title system("touch aaa")\n#';

gnuplot()
.set('term png')
.set('output "out.png"')
.set(`title "${title}"`)
.set('xrange [-10:10]')
.set('yrange [-2:2]')
.set('zeroaxis')
.plot('(x/4)**2, sin(x), 1/x')
.end();