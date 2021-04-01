class ValidateUserInfo():
    """
        This class is a utility class that is used to make sure the information
        the user entered is acceptable
    """

    def __init__(self, username, password, confirmation):
        self.username = username
        self.password = password
        self.confirmation = confirmation
    
    def do_passwords_match(self):
        return self.password == self.confirmation

    def does_username_exist(self, User):
        return User.objects.filter(username=self.username).exists()

    def is_password_length_valid(self):
        return len(self.password) >= 8