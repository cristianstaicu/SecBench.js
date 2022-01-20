import matplotlib.pyplot as plt
import numpy as np


labels = ['Path traversal', 'Prototype pollution', 'ReDoS','Command injection','ACE/ACI/Sandbox breakout' ,'RCE']
snyk_no_fix = [291,125,53,111,56,20]
ga_no_fix = [73,51,8,59,22,2]
snyk_fix=[71,155,177,92,65,59]
ga_fix=[26,140,41,85,13,10]
no_fix_suite=[69,22,65,196,28,8]
fix_suite=[114,78,48,19,14,3]
x = np.arange(6)  # the label locations
width = 0.2  # the width of the bars


fig, ax = plt.subplots()
ax.bar(x-0.2, snyk_no_fix, width, label='snyk: no fixed version',color='red')
ax.bar(x-0.2, snyk_fix, width, label='snyk: fixed versions',color='green', bottom=[291,125,53,111,56,20])

ax.bar(x, ga_no_fix, width, label='GA: no fixed version',color='red')
ax.bar(x, ga_fix, width, label='GA:fixed version',color='green',bottom=[73,51,8,59,22,2])

ax.bar(x+0.2, no_fix_suite, width, label='packages with no fixed version in suite',color='red')
ax.bar(x+0.2, fix_suite, width, label='packages with fixed version in suite',color='green', bottom=[69,22,65,196,28,8])

# Add some text for labels, title and custom x-axis tick labels, etc.
ax.set_ylabel('count')
ax.set_title('Overview')
ax.set_xticks(x)
ax.legend()

plt.xticks(rotation=90, ha='left')
ax.set_xticklabels(labels)
# ax.bar_label(rects1, padding=3)
# ax.bar_label(rects2, padding=3)
# fig.tight_layout()

plt.show()
