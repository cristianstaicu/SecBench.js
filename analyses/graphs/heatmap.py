import numpy as np
import seaborn as sns
import matplotlib.pylab as plt

plt.figure(figsize = (20,10))
#uniform_data = np.random.rand(10, 12)
x_axis_labels = [0, 1,2,3,4,5,6,7,8,"9+"] # labels for x-axis
y_axis_labels = ["0-10%","10-20%","20-30%","30-40%","40-50%","50-60%","60-70%","70-80%","80-90%","90-100%"] # labels for y-axis

uniform_data = np.matrix([[0,0,0,8,3,1,2,4,1,4],[0,0,1,8,2,3,2,1,2,2],[0,0,4,2,3,2,1,1,0,1],[0,0,2,3,4,1,0,1,1,0],[0,0,0,0,0,1,0,0,0,0],[0,0,2,0,8,1,0,0,0,1],[0,0,0,0,0,1,0,0,2,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,6,9,4,6,2,3,2,3]])
sns.set(font_scale = 3)
with sns.axes_style("white"):    
    ax = sns.heatmap(uniform_data, linewidth=0.5, cmap="YlGnBu", yticklabels=y_axis_labels, xticklabels=x_axis_labels)
    ax.invert_yaxis()       
    ax.set(xlim=(1, None))
plt.xlabel('Max call chain', labelpad=30) # x-axis label with fontsize 15
plt.ylabel('Percentage of the API used', labelpad=30) # y-axis label with fontsize 15
plt.tight_layout()
plt.subplots_adjust(left=0.17, right=1.05)
plt.savefig("heatmap.pdf")
#plt.show()
