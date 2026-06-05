class Sorting{

    // quick sort

    private static void quickSort(int arr[]){
        quickSort(arr, 0, arr.length - 1);
    }    
    private static void quickSort(int arr[], int low, int high){
        if(low < high){
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    // Partition function

    private static int partition(int arr[], int low, int high){
        int pivot = arr[high];
        int i = low - 1;
        for(int j = low; j < high; j++){
            if(arr[j] < pivot){
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i+1, high);
        return i + 1;
    }

    // Merge Sort
    private static void mergeSort(int arr[]){
        mergeSort(arr, 0, arr.length - 1);
    }

    private static void mergeSort(int arr[], int low, int high){
        if(low < high){
            int mid = low + (high - low)/2;
            mergeSort(arr, low, mid);
            mergeSort(arr, mid + 1, high);
            merge(arr, low, mid, high);
        }
    }

    // Merge function
    private static void merge(int arr[], int low, int mid, int high){
        int n1 = mid - low + 1;
        int n2 = high - mid;
        int left[] = new int[n1];
        int right[] = new int[n2];
        for(int i = 0; i < n1; i++){
            left[i] = arr[low + i];
        }
        for(int i = 0; i < n2; i++){
            right[i] = arr[mid + 1 + i];
        }

        int n = 0;
        int m = 0;
        int k = low;
        while(n < n1 && m < n2){
            if(left[n] < right[m]){
                arr[k] = left[n];
                n++;
            }else{
                arr[k] = right[m];
                m++;
            }
            k++;
        }
        while(n < n1){
            arr[k] = left[n];
            n++;
            k++;
        }
        while(m < n2){
            arr[k] = right[m];
            m++;
            k++;
        }
    }

    //Heap Sort 
    
    private static void heapSort(int arr[]){
        int n = arr.length;
        for(int i = n/2-1; i >= 0; i--){
            heapify(arr, n, i);
        }
        for(int i = n - 1; i >= 0; i--){
            swap(arr, 0, i);
            heapify(arr, i, 0);
        }
    }

    // Heapify function

    private static void heapify(int arr[], int n, int i){
        int largest = i;
        int l = 2 * i + 1;
        int r = 2 * i + 2;
        if(l < n && arr[l] > arr[largest]){
            largest = l;
        }
        if(r < n && arr[r] > arr[largest]){
            largest = r;
        }
        if(largest != i){
            swap(arr, i, largest);
            heapify(arr, n, largest);
        }
    }

    // Swap function

    private static void swap(int arr[], int i, int j){
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // print function

    private static void printValue(int arr[]){
        for(int i : arr){
            System.out.print(i+" ");
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        int arr[] = {2,7,4,1,6,3,5};
        
        System.out.println("--------------------------");
        int qSort[] = arr.clone();
        System.out.println("Before Quick Sort : ");
        printValue(qSort);
        System.out.println("\nAfter Quick Sort : ");
        quickSort(qSort);   
        printValue(qSort);
        System.out.println("--------------------------");
        int mSort[] = arr.clone();
        System.out.println("Before Merge Sort : ");
        printValue(mSort);    
        mergeSort(mSort);
        System.out.println("\nAfter Merge Sort : ");
        printValue(mSort);
        System.out.println("--------------------------");
        int hSort[] = arr.clone();
        System.out.println("Before Heap Sort : ");
        printValue(hSort);
        heapSort(hSort);
        System.out.println("\nAfter Heap Sort : ");
        printValue(hSort);
        System.out.println("--------------------------");

    }



}
