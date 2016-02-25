class User < ActiveRecord::Base
  # Remember to create a migration!

  def password
    @password ||= BCrypt::Password.new(password_hash)
  end

  def password=(new_password)
    @raw_password = new_password
    @password = BCrypt::Password.create(new_password)
    self.password_hash = @password
  end

  def authenticate(password)
    self.password == password
  end

  private
  def raw_password
    @raw_password
  end

  def password_reqs
    if raw_password || new_record?
      if raw_password.length < 6
        errors.add(:password, "needs 6 characters")
      end
    end
  end
end
