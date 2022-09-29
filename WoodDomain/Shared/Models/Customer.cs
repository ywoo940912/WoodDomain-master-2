using System;
using Google.Cloud.Firestore;
using Firebase.Database;
using FirebaseAdmin;


namespace WoodDomain.Shared.Models
{
    [FirestoreData]
    public class Customer
    {
        public string CustomerId { get; set; }

        public DateTime date { get; set; }

        [FirestoreProperty]
        public string FirstNameCustomer { get; set; }
        [FirestoreProperty]
        public string LastNameCustomer { get; set; }
        [FirestoreProperty]
        public string EmailAddressCustomer { get; set; }
        


        public Customer()
        {
        }
    }
}
