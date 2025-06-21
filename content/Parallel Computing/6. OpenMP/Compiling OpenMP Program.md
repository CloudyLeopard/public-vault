```bash
gcc -Wall -fopenmp -o omp_hello omp_hello.c
```
`-o` makes it so that its not called `a.out`
the only extra thing is `fopenmp`: telling gcc to be careful, that the c file contains openmp material. 

**Using the example in [[OpenMP#Part 1 Basics of OpenMP]]**
If you run:
```bash
./omp_hello 4
```

If compiled correctly, you will have an executable called `omp_hello`.
`./omp_hello 4` -> create 4 thread