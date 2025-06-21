
To use [[MPI]], three main **basic** lines:
- `#include <mpi.h>`
- `MPI_Init`
- `MPI_Finalize`

```C
...
#include <mpi.h>
...
int main(int argc, char* argv[]) {
	...
	/* No MPI Calls before this */
	MPI_Init(&argc, &argv);
	...
	MPI_Finalize();
	/* No MPI Calls after this */
	...
	return 0;
}
```

## `MPI_Init`

```C
int MPI_Init(
    int* argc_p, 
    char*** argv_p
)
```

This function initializes the MPI environment. **No MPI functions should be called before this.**

If your main function has `argc` and `argv`, you should pass them as:

```C
MPI_Init(&argc, &argv);
```

• `argv` is an **array of strings**, which means it’s an **array of pointers** (char**).
• When passing `argv` to `MPI_Init`, it needs to be modifiable, so we pass **a pointer to `argv`**, making it char*** (a pointer to a pointer to a pointer).

So, in short:
• `argc` is an int, so MPI_Init takes a pointer to it (int* → `&argc`).
• `argv` is char**, and we pass a pointer to it (char*** → `&argv`).

If you’re not using command-line arguments, you can also pass NULL, NULL.

```C
MPI_Init(NULL, NULL);
```

> [!info] Calling `MPI_Init` creates a "global" [[MPI Communicator|Communicator]] `MPI_COMM_WORLD`

## `MPI_Finalize`

```C
int MPI_Finalize(void);
```

Does not take any argument.

it means to turnoff the MPI [[Runtime]] - after this line, we cannot use any MPI functions (no more communication)

However, this does not shut down the process, and you can keep running the program afterwards (without communicatino).

You may want to do this because each process may need to do tasks locally after communication is done. Turning off [[Runtime]] will speed up the performance (no longer need to maintain extra code)