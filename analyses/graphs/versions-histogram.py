# libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from requests import head
import seaborn as sns

# # set seaborn style
# sns.set_theme()
# df = pd.read_csv ('vuln-versions.csv')
# # print(df) 
# #print(df[df.columns[1]])
# # Data
# x=range(1,183)
# df[df.columns[2]] = df[df.columns[2]].replace(0,1)
# # print(df)
# diff = df[df.columns[1]].sub(df[df.columns[2]], fill_value=0)
# y=[ diff, df[df.columns[2]]]
# print(y)
 
# # Plot
# #ax = plt.stackplot(x,y, labels=['Not vulnerable','Vulnerable'])
# fig, ax = plt.subplots()
# ax.bar(x, diff, label='Not affected',edgecolor = "none")
# ax.bar(x, df[df.columns[2]], bottom=diff, label='Affected',edgecolor = "none")
# plt.legend(loc='upper left')
# plt.xlabel("Packages", labelpad=10)
# plt.ylabel("Number of versions", labelpad=10)
# plt.ylim([0,100])
# plt.tight_layout()
# plt.savefig("versions-surface.pdf")

df1 = pd.read_csv ('vuln-versions_prototype-pollution.csv', header=None)
df1.columns=['name','not_vulnerable','vulnerable']
# print(df1)

df1 = df1[df1['vulnerable']!=0]
print(len(df1))
df1 = df1.drop_duplicates(subset=['name'])
print(len(df1))

# df_tmp = df1[df1['vulnerable']==0]
# print(df_tmp['name'].tolist())
# print(len(df_tmp['name'].tolist()))


df2 = pd.read_csv ('vuln-versions_redos.csv', header=None)
df2.columns=['name','not_vulnerable','vulnerable']
# print(df)
df2 = df2[df2['vulnerable']!=0]
print(len(df2))
df2 = df2.drop_duplicates(subset=['name'])
print(len(df2))

# df_tmp = df2[df2['vulnerable']==0]
# print(df_tmp['name'].tolist())
# print(len(df_tmp['name'].tolist()))

df3 = pd.read_csv ('vuln-versions_ace-breakout.csv', header=None)
df3.columns=['name','not_vulnerable','vulnerable']

df3 = df3[df3['vulnerable']!=0]
print(len(df3))
df3 = df3.drop_duplicates(subset=['name'])
print(len(df3))

df4 = pd.read_csv ('vuln-versions_command-injection.csv', header=None)
df4.columns=['name','not_vulnerable','vulnerable']
# print(df)

df4 = df4[df4['vulnerable']!=0]
print(len(df4))
df4 = df4.drop_duplicates(subset=['name'])
print(len(df4))

df5 = pd.read_csv ('vuln-versions_path-traversal.csv', header=None)
df5.columns=['name','not_vulnerable','vulnerable']
# print(df1)


df5 = df5[df5['vulnerable']!=0]
print(len(df5))
df5 = df5.drop_duplicates(subset=['name'])
print(len(df5))

df = pd.concat([df1, df2,df3,df4,df5])
df = df[df['vulnerable']!=0]
print(len(df))
df['total']=df.loc[:,['not_vulnerable','vulnerable']].sum(axis=1)
df = df.sort_values(by=['total'])
# print(df)

import matplotlib.pyplot as plt
import seaborn as sns

#set seaborn plotting aesthetics
sns.set(style='white')
# fig, ax = plt.subplots()
# ax = df.set_index('name').plot(kind='bar', stacked=True)

# a=np.arange(0,len(df), 25)
# ax.set_xticks(a)
# ax.set_xticklabels(a)
# plt.legend(loc='upper left')
# plt.xlabel("Packages", labelpad=10)
# plt.ylabel("Number of versions", labelpad=10)
# # plt.ylim([0,100])
# plt.tight_layout()
# # plt.savefig("versions-surface.pdf")
# plt.show()

# df = pd.read_csv ('vuln-versions.csv')
# # print(df) 
# #print(df[df.columns[1]])
# # Data
x=range(len(df))
# df[df.columns[2]] = df[df.columns[2]].replace(0,1)
# print(df)
diff = df['not_vulnerable']
# y=[ diff, df[df.columns[2]]]
# print(y)
import seaborn as sns
import matplotlib.pyplot as plt
sns.set()
sns.set_style("whitegrid")
sns.set_palette("Set2")
plt.rcParams["figure.figsize"] = (16, 5)
fig, ax = plt.subplots()
font_size = 30
legend_font_size = 24

ax.bar(x, df['not_vulnerable'], label='Not affected',edgecolor = "none")
ax.bar(x, df['vulnerable'], bottom=diff, label='Affected',edgecolor = "none")
plt.legend(loc='upper left')
plt.xlabel("Packages", labelpad=10)

a=np.arange(0,len(df),30)
a= np.append(a,[len(df)], axis=0)
# print(a)
ax.set_xticks(a)

b=np.arange(0,len(df),30)
b= np.append(b,[len(df)], axis=0)
b = np.delete(b, 0, 0)
b = np.insert(b, 0, 1)
ax.set_xticklabels(b)
ax.set_ylabel("Number of versions", fontsize=font_size, labelpad=20)
ax.set_xlabel("Packages", fontsize=font_size, labelpad=20)
ax.set_ylim(0,100)

ax.tick_params(axis='both', which='major')
ax.tick_params(axis='y', which='major', labelsize=legend_font_size)
ax.tick_params(axis='x', which='major', labelsize=legend_font_size, rotation=90)
ax.grid("both")
# plt.legend(bbox_to_anchor=(0,1.02,1,0.2), loc="lower left",
#                 mode="expand", borderaxespad=0, ncol=2)
plt.setp(ax.get_legend().get_texts(), fontsize=font_size)
plt.subplots_adjust(top=0.91, right=0.99, bottom=.32)
plt.tight_layout()
# plt.savefig("versions-surface.pdf")
plt.show()