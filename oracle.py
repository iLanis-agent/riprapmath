import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def hu(n, d): return (2*n + d) // (2*d)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def volume(l, w, t):
    return f"The area of {l} ft by {w} ft at {t} inches thick takes {dec(hu(l*w*t*100,324))} cu yd of stone."
def tons(c, d):
    return f"The {c} cu yd at {dec(d)} tons a cubic yard weighs {dec(c*d)} tons."
def trucks(t, l):
    n = (t + l - 1)//l; sp = n*l - t
    return f"The {t} tons in loads of {l} tons takes {pl(n,' truck',' trucks')}, leaving {sp} " + ("ton" if sp == 1 else "tons") + " of room in the last one."
def cost(t, tp, n, f, a):
    c = t*tp + n*f
    return (f"The {t} " + ("ton" if t == 1 else "tons") + f" at ${dec(tp)} and the {pl(n,' truck',' trucks')} at ${dec(f)} delivery cost ${money(c)}, or ${money(hu(c,a))} a square foot over the {a}.")
random.seed(754)
R=random.randint
cases = [
 dict(fn="volume", args=["100","10","12"], expect=volume(100,10,12)),
 dict(fn="tons", args=["37","1.4"], expect=tons(37,140)),
 dict(fn="trucks", args=["52","20"], expect=trucks(52,20)),
 dict(fn="cost", args=["52","42","3","150","1000"], expect=cost(52,4200,3,15000,1000)),
]
for _ in range(25):
    l,w,t=R(1,10000),R(1,1000),R(1,120); cases.append(dict(fn="volume", args=[str(l),str(w),str(t)], expect=volume(l,w,t)))
for _ in range(25):
    c,d=R(1,100000000),R(1,1000); cases.append(dict(fn="tons", args=[str(c),dec(d)], expect=tons(c,d)))
for _ in range(20):
    t,l=R(1,100000000),R(1,1000); cases.append(dict(fn="trucks", args=[str(t),str(l)], expect=trucks(t,l)))
for _ in range(20):
    t,tp,n,f,a=R(1,100000000),R(1,1000000),R(1,1000000),R(1,1000000),R(1,100000000)
    cases.append(dict(fn="cost", args=[str(t),dec(tp),str(n),dec(f),str(a)], expect=cost(t,tp,n,f,a)))
errs=[["volume",["0","10","12"]],["volume",["100","0","12"]],["volume",["100","10","0"]],["tons",["0","1.4"]],["tons",["37","0"]],["tons",["37","1.401"]],
 ["trucks",["0","20"]],["trucks",["52","0"]],["cost",["0","42","3","150","1000"]],["cost",["52","0","3","150","1000"]],["cost",["52","42","0","150","1000"]],["cost",["52","42","3","0","1000"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
