# libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# set seaborn style
sns.set_theme()
df = pd.read_csv ('vuln-versions.csv') 
#print(df[df.columns[1]])
# Data
x=range(1,183)
df[df.columns[2]] = df[df.columns[2]].replace(0,1)
diff = df[df.columns[1]].sub(df[df.columns[2]], fill_value=0)
y=[ diff, df[df.columns[2]]]
 
# Plot
#ax = plt.stackplot(x,y, labels=['Not vulnerable','Vulnerable'])
fig, ax = plt.subplots()
ax.bar(x, diff, label='Not affected',edgecolor = "none")
ax.bar(x, df[df.columns[2]], bottom=diff, label='Affected',edgecolor = "none")
plt.legend(loc='upper left')
plt.xlabel("Packages", labelpad=10)
plt.ylabel("Number of versions", labelpad=10)
plt.ylim([0,100])
plt.tight_layout()
plt.savefig("versions-surface.pdf")
