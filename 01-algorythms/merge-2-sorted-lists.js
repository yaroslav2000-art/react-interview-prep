// You are given the heads of two sorted linked lists list1 and list2.

// Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

// Return the head of the merged linked list.

//Thoughts:
//
// Input: list1 = [1,2,4], list2 = [1,3,4,5]
//Output: [1,1,2,3,4,4,5]

function mergeLinkedLists(l1, l2) {
  let dummy = new ListNode(0);
  let current = dummy;

  while (l1 !== null && l2 !== null) {
    if (l1.value <= l2.value) {
      current.next = l1;
      l1 = l1.next; //move current
    } else {
      current.next = l2;
      l2 = l2.next;
    }
  }

  if (l1 !== null) {
    current.next = l1;
  } else {
    current.next = l2;
  }
  return dummy.next;
}
