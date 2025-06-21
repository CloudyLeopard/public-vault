Most of OpenMP is based on Pragmas

> Most of the OpenMP code start with `#pragma omp`

Special **preprocessor** instructions
```C
#pragma omp ...
```
Specified by the C standard for providing additional information to the compiler, beyond what is conveyed in the language itself

> [!info] About `#` and preprocessor instructions
> Anything that starts with `#` is a comment to the preprocessor, i.e. any code first reaches pre-processor before compiler. 
> 
> Preprocessor removes all the comments, extra spaces, removes and executes lines that start with `#`
> - e.g. `#include<std.h>`
> - It will grab all the code from `std.h` and copy it into your code, then remove this line from the code

Note: `#` is specified by C standard, but `#pragma` is for OMP.

Most basic directive: `# pragma omp parallel`, used to [[Creating Threads in OpenMP|create threads]]

> [!important]
> after `# pragma omp parallel for`, the next line **must** be a for loop.

